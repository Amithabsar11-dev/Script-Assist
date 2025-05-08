export const useAuth = () => {
    const signup = (username: string, password: string) => {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[username]) return false; // Username already exists
  
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      return true;
    };
  
    const login = (username: string, password: string) => {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      return users[username] === password;
    };
  
    return { login, signup };
  };
  