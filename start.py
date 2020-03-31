import os
if __name__ == "__main__":
    os.system("killall node")
    os.chdir("backend/scripts")
    os.system("source reqs/bin/activate")
    os.chdir("../../client/")
    os.system("npm start &")
    os.chdir("../backend")
    os.system("npm start")

