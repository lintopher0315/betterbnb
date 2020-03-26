import os
if __name__ == "__main__":
    os.chdir("client/")
    os.system("npm start &")
    os.chdir("../backend")
    os.system("npm start")

