const AdminLogInScreen = ({login, pass, setPass}) => {
    return(
        <div className="login">
            <form onSubmit={login}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="pass" id="pass" value={pass}
            onChange={(e) => setPass(e.target.value)}/>
            <input type="submit" value="Login" className="btn"/>
            </form>
        </div>
    )
}

export default AdminLogInScreen