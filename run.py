import os
if __name__ == "__main__":
    os.system("git pull")
    os.chdir("backend")
    os.system("echo here ")
    os.system("pwd")
    os.system("rm -rf node_modules")
    os.system("npm install")
    os.chdir("scripts/")
    os.system("deactivate")
    os.system("rm -rf reqs")
    os.system("virtualenv reqs")
    os.system("source reqs/bin/activate")
    os.system("pip3 install -r requirements.txt")

    os.chdir("../../client/")
    os.system("rm -rf node_modules")
    os.system("npm install")

    os.system("npm start &")
    os.chdir("../backend")
    os.system("nodemon")

