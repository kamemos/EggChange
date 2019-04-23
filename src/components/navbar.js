import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faSignInAlt, faSignOutAlt, faHome, faPlusCircle, faBomb, faComment } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import { user } from '../redux/actions';
import { Link, withRouter } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import { Logo } from "../components";
import { get } from "lodash";

/*
Color palette
#F8DE7E
#FADA5E
#FCF4A3

#FCE205
#F8E473
#FEDC56
*/

const Container = styled.nav`
position: sticky;
background-color: #fedc56;
top: 0;
width: 100vw;
.top {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 50px;
    min-height: 50px;
    box-sizing: border-box;
    padding: 0px 15px;

    article {
        flex: 1;
        &.logo {
            justify-self: flex-start;
        }
        &.menu-btn {
            text-align: right;
            font-size: 1.25rem;
            justify-self: flex-end;
        }
        &.title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
article.menu-large {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ul {
        list-style: none;
        display: flex;
        align-items: center;
        li {
            /* margin: 2px; */
        }
    }
}
article.menu-small {
    display: flex;
    justify-content: center;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-bottom: 15px;

        li:last-child {
            margin-top: 10px;
        }
        li {
            white-space: nowrap;
        }
    }
}
@media screen and (max-width: 1024px) {
    .small-no-show {
        display: none !important;
    }
}
@media screen and (min-width: 1025px){
    .large-no-show {
        display: none !important;
    }
}
z-index: 52;
`;

const ChickButton = styled.div`
    display: flex;
    align-items: center;
    img.chick {
        height: 30px;
        width: 30px;
    }
`;

const Button = styled.button`
font-size: 0.9rem;
padding: 7px 10px;
border-radius: calc(0.9rem + 7px);
box-sizing: border-box;
margin-bottom: auto;
outline: none;
border: none;
background: none;
user-select: none;
line-height: 0.9rem;
color: #000;
svg {
    margin-right: 3px;
}

&:hover {
    color: #555;
    text-decoration: underline;
    text-underline-position: under;
}
&:active {
    color: #111;
    text-decoration: underline;
    text-underline-position: under;
}
`;

const LoginButton = ( user ) => {
    const email = get(user, 'user.email', '')
    return (email === '') ? 
        <ChickButton>
            <Link to='/authen'>
                <Button>
                    <FontAwesomeIcon
                        icon={faSignInAlt}
                    />
                    Login
                </Button>
            </Link>
        </ChickButton>:
        <ChickButton>
            <img className='chick' alt="mascott" src={require('../assets/chick_icon.svg')}/>
            <span className="large-no-show">{email}</span>
        </ChickButton>
}

const List = ({ user, onLogout }) => {
    return (
        <ul>
            <li>
                <Link to="/">
                    <Button>
                        <FontAwesomeIcon
                            icon={faHome}
                        />
                        Home
                    </Button>
                </Link>
            </li>
            <li>
                <Link to="/board">
                    <Button>
                        <FontAwesomeIcon
                            icon={faSearch}
                        />
                        Search
                    </Button>
                </Link>
            </li>
            {
                (get(user, 'email', '').length !== 0) && (
                    <li>
                        <Link to="/editor">
                            <Button>
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                />
                                New&nbsp;Post
                            </Button>
                        </Link>
                    </li>
                )
            }
            {
                (get(user, 'email', '').length !== 0) && (
                    <li>
                        <Button
                            onClick={onLogout}
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                            />
                            Log&nbsp;Out
                        </Button>
                    </li>
                )
            }
            <li>
                <LoginButton user={user} />
            </li>
        </ul>
    );
}

const MapTitleComponent = (icon, text) => (
    () => (
        <div style={{
            userSelect: 'none'
        }}>
            <FontAwesomeIcon
                icon={icon}
                style={{
                    marginRight: '5px'
                }}
            />
            {text}
        </div>
    )
)
const NameMap = {
    "": MapTitleComponent(faHome, "Home"),
    "board": MapTitleComponent(faSearch, "Search"),
    "editor": MapTitleComponent(faPlusCircle, "New Post"),
    "post": MapTitleComponent(faComment, "Post"),
    "authen": MapTitleComponent(faSignInAlt, "Log In")
};

const ErrorComp = MapTitleComponent(faBomb, "Error")

@connect(state => ({
    user: { ...state.user },
}), {
    ...user,
})
class Navbar extends Component {
    state = {
        isOpen: false
    }
    onToggleHamburger = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    componentDidUpdate(prevProps) {
        if (this.props.windowWidth !== prevProps.windowWidth) {
            this.setState({ isOpen: false });
        }
    }
    onLogout = () => {
        this.props.logout();
        window.location.reload(); 
    }
    render() {
        const pathname = get(this.props, 'location.pathname', '/bomb').split("/")[1];
        const TitleComponent = (Object.keys(NameMap).indexOf(pathname) !== -1) ? (NameMap[pathname]) : (ErrorComp);
        return (
            <>
                <Container>
                    <section className="top">
                        <article className="logo small-no-show">
                            <Link to='/'>
                                <Logo.LogoWithName size={35} />
                            </Link>
                        </article>
                        <article className="logo large-no-show">
                            <Link to='/'>
                                <Logo.Logo size={35} />
                            </Link>
                        </article>
                        <article className="title">
                            <TitleComponent />
                        </article>
                        <article className="menu-btn">
                            <FontAwesomeIcon
                                className="large-no-show"
                                icon={faBars}
                                onClick={this.onToggleHamburger}
                            />
                        </article>
                        <article className="menu-large small-no-show">
                            <List
                                user={this.props.user}
                                onLogout={this.onLogout}
                            />
                        </article>
                    </section>
                    <article className="menu-small large-no-show">
                        <Fade collapse when={this.state.isOpen}>
                            <List
                                user={this.props.user}
                                onLogout={this.props.logout}
                            />
                        </Fade>
                    </article>
                </Container>
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    height: "50px",
                    width: "100vw",
                    boxShadow: "0px 2px 5px #0003",
                    zIndex: "51"
                }} />
            </>
        )
    }
}

export default withRouter(Navbar);