fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "aabadin@gmail.com", password: "test1234" }),
})
  .then(r => r.text().then(t => console.log(r.status, t)))
  .catch(e => console.error("FETCH ERROR", e));
