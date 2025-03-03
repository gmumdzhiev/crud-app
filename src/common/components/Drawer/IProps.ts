export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}