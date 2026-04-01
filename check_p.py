import os
root = r'C:\Users\hongtu\.openclaw\workspace-alex\JennaPress'
files = [
    'templates/saas-landing/blog/BlogHome.vue',
    'templates/saas-landing/blog/BlogCategory.vue',
    'templates/saas-landing/blog/modules/DefaultCategory.vue',
    'templates/saas-landing/blog/modules/DefaultPost.vue',
    'templates/corporate-basic/blog/BlogHome.vue',
    'templates/corporate-basic/blog/BlogCategory.vue',
    'templates/corporate-basic/blog/BlogPost.vue',
    'templates/corporate-basic/blog/modules/DefaultCategory.vue',
    'templates/corporate-basic/blog/modules/CasesCategory.vue',
    'templates/corporate-basic/blog/modules/DefaultPost.vue',
]
for rel in files:
    full = os.path.join(root, rel)
    with open(full, 'r', encoding='utf-8') as f:
        content = f.read()
    has_p_def = 'const p =' in content
    has_p_usage = 'p(' in content
    idx = content.find('const p')
    snippet = content[idx:idx+100] if idx >= 0 else 'NO DEF'
    status = 'BROKEN' if (not has_p_def and has_p_usage) else 'OK'
    print(f'[{status}] def={has_p_def} use={has_p_usage}: {rel}')
    if status == 'BROKEN' or has_p_def:
        print(f'  {repr(snippet)}')
