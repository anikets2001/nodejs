const express = require("express");
const fs = require("fs");
const users = require("./users");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

// rest api routes

// get all users
app.get("/api/users", (req, res) => {
  res.setHeader("myName", "Aniket Singh");
  res.status(200).json(users);
});

// get user by id
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === parseInt(userId));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// add a new user
app.post("/api/users", express.json(), (req, res) => {
  const newUser = req.body;

  if (!newUser || !newUser.first_name || !newUser.last_name || !newUser.email) {
    //400 bad request
    return res.status(400).json({ message: "All Fields are required" });
  }

  newUser.id = users.length + 1;
  //here we will append this new user to the users array and also write it to the users.json file async
  users.push(newUser);
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error writing to file", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(201).json(newUser);
    }
  });
});

// update a user patch
app.patch("/api/users/:id", express.json(), (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === parseInt(userId));
  if (user) {
    Object.assign(user, req.body);
    res.status(200).json(user);

    // here we will also write the updated users array to the users.json file async
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file", err);
      }
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// delete a user
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === parseInt(userId));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: "User deleted" });

    // here we will also write the updated users array to the users.json file async
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file", err);
      }
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// pages
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.get("/users", (req, res) => {
  const html = `<!DOCTYPE html>
<html>
<body>
  <h1>Welcome to the Users Page</h1>
    <ul>
    ${users.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
</body>
</html>`;
  res.send(html);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === parseInt(userId));
  if (user) {
    const html = `<!DOCTYPE html>
<html>
<body>
  <h1>User Details</h1>
  <p>Name: ${user.first_name} ${user.last_name}</p>
  <p>Email: ${user.email}</p>
</body>
</html>`;
    res.send(html);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
