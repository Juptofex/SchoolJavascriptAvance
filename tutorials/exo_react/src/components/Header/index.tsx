import './Header.css';
export interface headerProps {
    logo: string;
    children: React.ReactNode;
}

export const Header = (props: headerProps) => {
    return (
        <header>
            <img src={props.logo} alt="" />
            <h1>{props.children}</h1>
        </header>
    );
};