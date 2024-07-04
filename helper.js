const users = [];

const home = (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect("/login");
    }
};

const signinget = (req, res) => {
    const error = req.session.error || "";
    delete req.session.error;
    res.render('register', { "error": error });
};

const signinpost = (req, res) => {
    const data = req.body;
    if (users.find((user) => user.username === data.username)) {
        req.session.error = "Username already exists";
        res.redirect("/register");
        return;
    }
    users.push(data);
    console.log(users);
    req.session.user = data;
    res.redirect("/");
};

const loginget = (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        const error = req.session.error || "";
        delete req.session.error;
        res.render("login", { "error": error });
    }
};

const loginpost = (req, res) => {
    const data = req.body;
    const user = users.find((user) => user.username === data.username && user.password === data.password);
    if (user) {
        req.session.user = users; // Store the entire user object, not just the data
        res.redirect("/");
    } else {
        req.session.error = "Invalid username or password";
        res.redirect("/login");
    }
};

const logout = (req, res) => {
    req.session.user = null;
    res.redirect("/login");
};
 const edit=(req,res)=>{
    if (req.session.user) {
        res.render('edit', { user: req.session.user });
    } else {
        res.redirect("/login"); 
    }
 }
 const editpost=(req,res)=>{
    const data = req.body;
    if (users.find((user) => user.username === data.username)) {
        req.session.error = "Username already exists";
        res.redirect("/edit");
        return;
    }
    users.push(data);
    console.log(users);
    req.session.user = data;
    res.redirect("/");
 }

 const deletepost=(req,res)=>{
    if (req.session.user) {
     
        const userIndex = users.findIndex(user => user.username === req.session.user.username);

        if (userIndex !== -1) {
           
            users.splice(userIndex, 1);
        }

        
        res.redirect("/login");
    } else {
        res.redirect("/login"); 
    }

 }

module.exports = { home, signinget, signinpost, loginget, loginpost, logout,edit,editpost,deletepost };
