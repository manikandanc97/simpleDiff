import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fonts
    content = content.replace('font-[400]', 'font-normal')
    content = content.replace('font-[500]', 'font-medium')
    content = content.replace('font-[600]', 'font-semibold')
    content = content.replace('font-[700]', 'font-bold')
    content = content.replace('font-[800]', 'font-extrabold')
    content = content.replace('font-[900]', 'font-black')
    
    # Leading (line height)
    content = content.replace('leading-[0.94]', 'leading-none')
    content = content.replace('leading-[1.1]', 'leading-tight')
    content = content.replace('leading-[1.2]', 'leading-tight')
    content = content.replace('leading-[1.5]', 'leading-relaxed')
    
    # Tracking (letter spacing)
    content = content.replace('tracking-[-0.01em]', 'tracking-tight')
    content = content.replace('tracking-[-0.015em]', 'tracking-tight')
    content = content.replace('tracking-[-0.02em]', 'tracking-tight')
    content = content.replace('tracking-[-0.03em]', 'tracking-tighter')
    content = content.replace('tracking-[-0.065em]', 'tracking-tighter')
    content = content.replace('tracking-[0.08em]', 'tracking-wide')
    content = content.replace('tracking-[0.2em]', 'tracking-widest')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                process_file(os.path.join(root, file))
