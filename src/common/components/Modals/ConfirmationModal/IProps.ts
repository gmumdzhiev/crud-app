export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}