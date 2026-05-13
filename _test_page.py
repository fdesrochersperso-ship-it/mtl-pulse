import sys, re
html = sys.stdin.read()
if 'NEXT_NOT_FOUND' in html or 'Internal Server Error' in html or 'Application error' in html:
    print('ERROR FOUND in page')
if 'Explorer les donn' in html:
    print('FOUND: Page title rendered')
if 'agriculture' in html.lower():
    print('FOUND: Categories rendered')
links = re.findall(r'href="/explore/([^"]+)"', html)
print(f'Category links found: {len(links)}')
for l in links[:15]:
    print(f'  /explore/{l}')
print(f'HTML length: {len(html)} chars')
