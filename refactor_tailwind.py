import os
import re
import math

def closest_value(val, allowed_values):
    return min(allowed_values.keys(), key=lambda k: abs(k - val))

def replace_px_rem_value(match, prefix, scale_map):
    original = match.group(0)
    val_str = match.group(1)
    
    # parse value
    if val_str.endswith('px'):
        val = float(val_str[:-2])
    elif val_str.endswith('rem'):
        val = float(val_str[:-3]) * 16
    elif val_str.endswith('em'):
        val = float(val_str[:-2]) * 16
    else:
        return original
        
    closest = closest_value(val, scale_map)
    mapped_class = scale_map[closest]
    return f"{prefix}-{mapped_class}"

def text_replacer(match):
    # Mapping px to tailwind text sizes
    sizes = {
        10: 'xs', 11: 'xs', 12: 'xs', 13: 'sm', 14: 'sm', 15: 'base', 16: 'base',
        17: 'lg', 18: 'lg', 19: 'xl', 20: 'xl', 21: 'xl', 22: 'xl',
        24: '2xl', 26: '2xl', 28: '3xl', 30: '3xl', 32: '3xl',
        36: '4xl', 40: '4xl',
        48: '5xl', 52: '5xl', 56: '5xl',
        60: '6xl', 64: '6xl', 72: '7xl'
    }
    return replace_px_rem_value(match, 'text', sizes)

def spacing_replacer(match, prefix):
    # Mapping px to tailwind spacing sizes (1 = 4px)
    sizes = {
        0: '0', 2: '0.5', 4: '1', 6: '1.5', 8: '2', 10: '2.5', 12: '3', 14: '3.5',
        16: '4', 20: '5', 24: '6', 28: '7', 32: '8', 36: '9', 40: '10', 44: '11',
        48: '12', 56: '14', 64: '16', 80: '20', 96: '24', 112: '28', 128: '32',
        144: '36', 160: '40', 176: '44', 192: '48', 208: '52', 224: '56', 240: '60',
        256: '64', 288: '72', 320: '80', 384: '96'
    }
    return replace_px_rem_value(match, prefix, sizes)

def max_width_replacer(match):
    # Mapping max-w to tailwind values
    sizes = {
        320: 'xs', 384: 'sm', 448: 'md', 512: 'lg', 576: 'xl',
        672: '2xl', 768: '3xl', 896: '4xl', 1024: '5xl', 1152: '6xl', 1280: '7xl'
    }
    return replace_px_rem_value(match, 'max-w', sizes)

def rounded_replacer(match):
    sizes = {
        2: 'sm', 4: 'DEFAULT', 6: 'md', 8: 'lg', 12: 'xl', 16: '2xl', 24: '3xl', 9999: 'full'
    }
    original = match.group(0)
    val_str = match.group(1)
    if val_str.endswith('px'):
        val = float(val_str[:-2])
    else:
        return original
    
    if val >= 50:
        return 'rounded-full'
        
    closest = closest_value(val, sizes)
    if sizes[closest] == 'DEFAULT':
        return 'rounded'
    return f"rounded-{sizes[closest]}"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Text sizes
    content = re.sub(r'text-\[([0-9\.]+(?:px|rem|em))\]', text_replacer, content)
    
    # Spacing (w, h, p, m, gap, top, bottom, left, right)
    for prefix in ['w', 'h', 'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'gap', 'top', 'bottom', 'left', 'right']:
        content = re.sub(rf'\b{prefix}-\[([0-9\.]+(?:px|rem|em))\]', lambda m, p=prefix: spacing_replacer(m, p), content)
    
    # Max width
    content = re.sub(r'max-w-\[([0-9\.]+(?:px|rem|em))\]', max_width_replacer, content)
    
    # Rounded
    content = re.sub(r'rounded-\[([0-9\.]+(?:px|rem|em))\]', rounded_replacer, content)
    content = re.sub(r'rounded-(t|b|l|r|tl|tr|bl|br)-\[([0-9\.]+(?:px|rem|em))\]', lambda m: f"rounded-{m.group(1)}-{rounded_replacer(re.match(r'rounded-\[([0-9\.]+(?:px|rem|em))\]', 'rounded-['+m.group(2)+']')).replace('rounded-', '')}", content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
                process_file(os.path.join(root, file))
