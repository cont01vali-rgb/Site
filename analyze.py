import re

with open('formula/europeHigh.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all path data
paths = re.findall(r'd="([^"]+)"', content)

min_x = float('inf')
min_y = float('inf')
max_x = float('-inf')
max_y = float('-inf')

for path in paths:
    # Extract all numbers (coordinates)
    coords = re.findall(r'[0-9]+\.?[0-9]*', path)
    
    # Process coordinates in pairs (x, y)
    for i in range(0, len(coords), 2):
        if i + 1 < len(coords):
            x = float(coords[i])
            y = float(coords[i + 1])
            
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)

print(f"Coordonate:")
print(f"X: {min_x} -> {max_x} (width: {max_x - min_x})")
print(f"Y: {min_y} -> {max_y} (height: {max_y - min_y})")
print(f"ViewBox sugerat: {min_x} {min_y} {max_x - min_x} {max_y - min_y}")