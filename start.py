import os
if __name__ == "__main__":
    os.system("killall node")
    os.chdir("client/")
    os.system("npm start &")
    os.chdir("../backend")
    os.system("npm start")

