import requests, json, base64, os, subprocess, sys

EMAIL = "2753325461@qq.com"
PASSWORD = "wzx19981201"
REPO_NAME = "mm-watchlist"

auth_str = base64.b64encode(f"{EMAIL}:{PASSWORD}".encode()).decode()
headers = {
    "Authorization": f"Basic {auth_str}",
    "User-Agent": "WorkBuddy-Deploy",
    "Accept": "application/vnd.github+json"
}

# Step 1: Create repo
print("正在创建仓库...")
body = {"name": REPO_NAME, "private": False, "auto_init": False}
r = requests.post("https://api.github.com/user/repos", headers=headers, json=body)
if r.status_code == 201:
    data = r.json()
    print(f"仓库创建成功: {data['html_url']}")
    clone_url = data['clone_url']
else:
    print(f"创建仓库失败 ({r.status_code}): {r.text}")
    # Maybe repo exists, try to get it
    r2 = requests.get(f"https://api.github.com/repos/{r.json().get('message','').split('/')[-1] if '/' in r.json().get('message','') else 'unknown'}", headers=headers)
    sys.exit(1)

# Step 2: Init git and push
os.chdir(r"C:\WatchlistApp\mm_app")

# Set git credentials
subprocess.run(["git", "config", "user.name", "mm-watch2026"], check=False)
subprocess.run(["git", "config", "user.email", EMAIL], check=False)

# Init if needed
if not os.path.exists(".git"):
    subprocess.run(["git", "init"], check=True)

# Add remote
subprocess.run(["git", "remote", "remove", "origin"], check=False)
clone_url_auth = clone_url.replace("https://", f"https://{EMAIL}:{PASSWORD}@")
subprocess.run(["git", "remote", "add", "origin", clone_url_auth], check=True)

# Stage and commit
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "Initial: mm_watchlist PWA app v1.0"], check=False)

# Push
print("正在推送代码...")
result = subprocess.run(["git", "push", "-u", "origin", "master"], capture_output=True, text=True)
if result.returncode != 0:
    # Try main branch
    result = subprocess.run(["git", "branch", "-M", "main"], check=False)
    result = subprocess.run(["git", "push", "-u", "origin", "main"], capture_output=True, text=True)

print(result.stdout)
if result.stderr:
    print(result.stderr)

print("\n部署完成!")
print(f"仓库地址: {clone_url.replace('https://', 'https://github.com/').replace('.git','')}")
