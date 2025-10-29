import subprocess
import os

def run_git_commands():
    try:
        # Schimb directorul de lucru
        os.chdir("e:/site")
        print("Changed directory to e:/site")
        
        # Git add
        result = subprocess.run(["git", "add", "."], capture_output=True, text=True, shell=True)
        print(f"Git add result: {result.returncode}")
        if result.stdout:
            print(f"stdout: {result.stdout}")
        if result.stderr:
            print(f"stderr: {result.stderr}")
        
        # Git status pentru verificare
        result = subprocess.run(["git", "status", "--short"], capture_output=True, text=True, shell=True)
        print(f"Git status: {result.stdout}")
        
        # Git commit
        result = subprocess.run(["git", "commit", "-m", "Enhanced Formula Learning with interactive Europe map features"], 
                              capture_output=True, text=True, shell=True)
        print(f"Git commit result: {result.returncode}")
        if result.stdout:
            print(f"stdout: {result.stdout}")
        if result.stderr:
            print(f"stderr: {result.stderr}")
        
        # Git push
        result = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True, shell=True)
        print(f"Git push result: {result.returncode}")
        if result.stdout:
            print(f"stdout: {result.stdout}")
        if result.stderr:
            print(f"stderr: {result.stderr}")
            
        print("Git operations completed!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_git_commands()