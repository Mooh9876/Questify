type HeaderProps = {
  subtitle: string;
};

export const Header = ({ subtitle }: HeaderProps) => (
  <header className="topbar">
    <span className="eyebrow">Questify</span>
    <h1>Alltagsaufgaben als klare Quests</h1>
    <p>{subtitle}</p>
  </header>
);