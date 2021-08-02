import React, {useEffect} from "react"
import {Redirect, Route, Switch, useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./redux/store"
import {initializeAppTC, RequestStatusType} from "./redux/reducers/app-reducer"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import Preloader from "./components/common/preloader/Preloader"
import {PacksList} from "./components/packsList/PacksList"
import {Profile} from "./components/profile/Profile"
import {HeaderMenu} from "./components/common/headerMenu/HeaderMenu"
/*import {Header} from "./components/common/header/Header"*/
import s from "./App.module.scss"

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const dispatch = useDispatch()

    const {pathname} = useLocation()

    const showHeaderMenu = () => {
        const IS_PACKS_LIST_PATH = pathname === "/" // false
        const IS_PROFILE_PATH = pathname === "/profile" //

        if (IS_PACKS_LIST_PATH || IS_PROFILE_PATH) {
            return <HeaderMenu/>
        }
        return null
    }

    console.log(pathname)
    console.log(typeof pathname)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    return (
        <div>
            {/*<Header/>*/}
            {showHeaderMenu()}
            <section className={s.pagesContainer}>
                {status === "loading" && <Preloader/>}
                <Switch>
                    <Route exact path={"/"} render={() => <PacksList/>}/>
                    <Route path={"/profile"} render={() => <Profile/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/registration"} render={() => <Registration/>}/>
                    <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                    <Route path={"/updatePassword/:token"} render={() => <UpdatePassword/>}/>
                    <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                    <Route path={"/404"} render={() => <PageNotFound/>}/>
                    <Redirect from={"*"} to={"/404"}/>
                </Switch>
            </section>
        </div>

    )
}

export default App