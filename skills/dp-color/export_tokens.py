#!/usr/bin/env python3
"""
Export color palette tokens in multiple formats.

Usage:
    python3 export_tokens.py --input palette.json --format css,json,figma --output ./tokens/
    python3 export_tokens.py --input palette.json --format css --p3    # Include P3 enhanced values
    python3 export_tokens.py --input palette.json --format all --dark  # Include dark mode remap

Input JSON format:
{
  "colors": {
    "primary": {
      "hue": 260,
      "max_chroma": 0.145,
      "p3_max_chroma": 0.19,
      "steps": {
        "50":  { "L": 0.96, "C": 0.029, "H": 256 },
        "100": { "L": 0.93, "C": 0.044, "H": 257 },
        ...
      }
    }
  },
  "meta": {
    "name": "Enterprise Color System",
    "base": "#1c2739",
    "wcag_target": "AA"
  }
}

If "steps" are omitted, the script auto-generates an 11-step ramp from hue + max_chroma
using the eased lightness curve.
"""

import json
import math
import argparse
import os
import sys

# ─── OKLCH → sRGB Conversion ───

def oklch_to_oklab(L, C, H):
    h_rad = math.radians(H)
    return L, C * math.cos(h_rad), C * math.sin(h_rad)

def oklab_to_linear_rgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b

    l = l_ ** 3
    m = m_ ** 3
    s = s_ ** 3

    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, bl

def linear_to_srgb(c):
    if c <= 0.0031308:
        return 12.92 * c
    return 1.055 * (c ** (1 / 2.4)) - 0.055

def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))

def oklch_to_hex(L, C, H):
    ol, oa, ob = oklch_to_oklab(L, C, H)
    r, g, b = oklab_to_linear_rgb(ol, oa, ob)
    r = clamp(linear_to_srgb(r))
    g = clamp(linear_to_srgb(g))
    b = clamp(linear_to_srgb(b))
    return f"#{int(round(r*255)):02x}{int(round(g*255)):02x}{int(round(b*255)):02x}"

def is_in_srgb_gamut(L, C, H):
    """Check if OKLCH value is within sRGB gamut (no clamping needed)."""
    ol, oa, ob = oklch_to_oklab(L, C, H)
    r, g, b = oklab_to_linear_rgb(ol, oa, ob)
    return all(-0.001 <= v <= 1.001 for v in [r, g, b])

# ─── Auto-generate ramp ───

STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
LIGHTNESS_EASED = [0.96, 0.93, 0.87, 0.79, 0.70, 0.60, 0.50, 0.40, 0.32, 0.25, 0.18]
CHROMA_BELL = [0.10, 0.18, 0.40, 0.65, 0.85, 1.00, 0.90, 0.75, 0.55, 0.35, 0.25]
HUE_OFFSETS = [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4, 5]

def generate_ramp(hue, max_chroma, hue_shift=1.0):
    ramp = {}
    for i, step in enumerate(STEPS):
        L = LIGHTNESS_EASED[i]
        C = round(max_chroma * CHROMA_BELL[i], 4)
        H = round((hue + HUE_OFFSETS[i] * hue_shift) % 360, 1)
        # Gamut safety: reduce chroma until in-gamut
        while C > 0.001 and not is_in_srgb_gamut(L, C, H):
            C = round(C - 0.001, 4)
        ramp[str(step)] = {"L": L, "C": C, "H": H}
    return ramp

def generate_dark_ramp(light_ramp):
    """Remap a light-mode ramp for dark mode surfaces."""
    dark = {}
    for step_name, vals in light_ramp.items():
        L = vals["L"]
        C = vals["C"]
        H = vals["H"]
        # Invert lightness mapping and reduce chroma ~20%
        dark_L = round(1.0 - L, 3)
        # Clamp to useful range
        dark_L = round(clamp(dark_L, 0.10, 0.95), 3)
        dark_C = round(C * 0.80, 4)
        dark[step_name] = {"L": dark_L, "C": dark_C, "H": H}
    return dark

# ─── Output formatters ───

def format_css(colors, meta, include_p3=False, include_dark=False):
    lines = [f"/* {meta.get('name', 'Color System')} — CSS Custom Properties */",
             f"/* Base: {meta.get('base', 'N/A')} | WCAG: {meta.get('wcag_target', 'AA')} */", ""]
    lines.append(":root {")
    for color_name, color_data in colors.items():
        steps = color_data.get("steps", {})
        lines.append(f"  /* {color_name} */")
        for step, vals in sorted(steps.items(), key=lambda x: int(x[0])):
            oklch = f"oklch({vals['L']:.2f} {vals['C']:.3f} {vals['H']:.0f})"
            hx = oklch_to_hex(vals['L'], vals['C'], vals['H'])
            lines.append(f"  --{color_name}-{step}: {oklch}; /* {hx} */")
        lines.append("")
    lines.append("}")

    if include_p3:
        lines.extend(["", "@media (color-gamut: p3) {", "  :root {"])
        for color_name, color_data in colors.items():
            p3_max = color_data.get("p3_max_chroma")
            if not p3_max:
                continue
            base_max = color_data.get("max_chroma", 0.15)
            steps = color_data.get("steps", {})
            lines.append(f"    /* {color_name} — P3 enhanced */")
            for step, vals in sorted(steps.items(), key=lambda x: int(x[0])):
                # Scale chroma proportionally to P3 ceiling
                p3_C = round(vals['C'] * (p3_max / base_max), 4)
                if p3_C > vals['C'] + 0.005:  # Only include if meaningfully different
                    oklch = f"oklch({vals['L']:.2f} {p3_C:.3f} {vals['H']:.0f})"
                    lines.append(f"    --{color_name}-{step}: {oklch};")
            lines.append("")
        lines.extend(["  }", "}"])

    if include_dark:
        lines.extend(["", "/* Dark mode */",
                       "@media (prefers-color-scheme: dark) {", "  :root {"])
        for color_name, color_data in colors.items():
            steps = color_data.get("steps", {})
            dark_steps = generate_dark_ramp(steps)
            lines.append(f"    /* {color_name} — dark */")
            for step, vals in sorted(dark_steps.items(), key=lambda x: int(x[0])):
                oklch = f"oklch({vals['L']:.2f} {vals['C']:.3f} {vals['H']:.0f})"
                hx = oklch_to_hex(vals['L'], vals['C'], vals['H'])
                lines.append(f"    --{color_name}-{step}: {oklch}; /* {hx} */")
            lines.append("")
        lines.extend(["  }", "}"])

    return "\n".join(lines)

def format_json_tokens(colors, meta, include_dark=False):
    """W3C Design Tokens Community Group format."""
    tokens = {
        "$name": meta.get("name", "Color System"),
        "$description": f"Base: {meta.get('base', 'N/A')} | WCAG: {meta.get('wcag_target', 'AA')}",
        "color": {}
    }
    for color_name, color_data in colors.items():
        steps = color_data.get("steps", {})
        token_group = {}
        for step, vals in sorted(steps.items(), key=lambda x: int(x[0])):
            oklch_str = f"oklch({vals['L']:.2f} {vals['C']:.3f} {vals['H']:.0f})"
            hx = oklch_to_hex(vals['L'], vals['C'], vals['H'])
            token_group[step] = {
                "$type": "color",
                "$value": oklch_str,
                "hex": hx,
                "oklch": {"L": vals["L"], "C": vals["C"], "H": vals["H"]}
            }
        tokens["color"][color_name] = token_group

    if include_dark:
        tokens["color-dark"] = {}
        for color_name, color_data in colors.items():
            steps = color_data.get("steps", {})
            dark_steps = generate_dark_ramp(steps)
            token_group = {}
            for step, vals in sorted(dark_steps.items(), key=lambda x: int(x[0])):
                oklch_str = f"oklch({vals['L']:.2f} {vals['C']:.3f} {vals['H']:.0f})"
                hx = oklch_to_hex(vals['L'], vals['C'], vals['H'])
                token_group[step] = {
                    "$type": "color",
                    "$value": oklch_str,
                    "hex": hx,
                    "oklch": {"L": vals["L"], "C": vals["C"], "H": vals["H"]}
                }
            tokens["color-dark"][color_name] = token_group

    return json.dumps(tokens, indent=2)

def format_figma_tokens(colors, meta):
    """Figma Tokens plugin format (Tokens Studio compatible)."""
    figma = {}
    for color_name, color_data in colors.items():
        steps = color_data.get("steps", {})
        group = {}
        for step, vals in sorted(steps.items(), key=lambda x: int(x[0])):
            hx = oklch_to_hex(vals['L'], vals['C'], vals['H'])
            group[step] = {
                "value": hx,
                "type": "color",
                "description": f"oklch({vals['L']:.2f} {vals['C']:.3f} {vals['H']:.0f})"
            }
        figma[color_name] = group
    return json.dumps(figma, indent=2)

# ─── Main ───

def main():
    parser = argparse.ArgumentParser(description="Export color palette tokens")
    parser.add_argument("--input", required=True, help="Input palette JSON file")
    parser.add_argument("--format", default="all",
                        help="Output formats: css, json, figma, or all (comma-separated)")
    parser.add_argument("--output", default="./tokens", help="Output directory")
    parser.add_argument("--p3", action="store_true", help="Include P3 gamut enhanced values in CSS")
    parser.add_argument("--dark", action="store_true", help="Include dark mode remapped values")
    args = parser.parse_args()

    with open(args.input, "r") as f:
        palette = json.load(f)

    colors = palette.get("colors", {})
    meta = palette.get("meta", {})

    # Auto-generate ramps for colors that only have hue + max_chroma
    for name, data in colors.items():
        if "steps" not in data:
            data["steps"] = generate_ramp(
                data.get("hue", 0),
                data.get("max_chroma", 0.15),
                data.get("hue_shift", 1.0)
            )

    os.makedirs(args.output, exist_ok=True)
    formats = [f.strip() for f in args.format.split(",")]
    if "all" in formats:
        formats = ["css", "json", "figma"]

    generated = []

    if "css" in formats:
        css = format_css(colors, meta, include_p3=args.p3, include_dark=args.dark)
        path = os.path.join(args.output, "tokens.css")
        with open(path, "w") as f:
            f.write(css)
        generated.append(path)

    if "json" in formats:
        tokens = format_json_tokens(colors, meta, include_dark=args.dark)
        path = os.path.join(args.output, "tokens.json")
        with open(path, "w") as f:
            f.write(tokens)
        generated.append(path)

    if "figma" in formats:
        figma = format_figma_tokens(colors, meta)
        path = os.path.join(args.output, "figma-tokens.json")
        with open(path, "w") as f:
            f.write(figma)
        generated.append(path)

    # Gamut check
    warnings = []
    for name, data in colors.items():
        for step, vals in data.get("steps", {}).items():
            if not is_in_srgb_gamut(vals["L"], vals["C"], vals["H"]):
                warnings.append(f"  ⚠ {name}-{step}: oklch({vals['L']} {vals['C']} {vals['H']}) is OUT of sRGB gamut")

    print(f"✅ Generated {len(generated)} token file(s):")
    for p in generated:
        print(f"   {p}")

    if warnings:
        print(f"\n⚠ Gamut warnings ({len(warnings)}):")
        for w in warnings:
            print(w)
    else:
        print("\n✅ All colors are within sRGB gamut.")

if __name__ == "__main__":
    main()
