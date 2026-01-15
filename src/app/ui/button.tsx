import { Button, ButtonProps } from "@mui/material";

const BUTTON_STYLES = {
    primary: {
        padding: '8px 16px',
        backgroundColor: '#1976d2',
        color: '#ffffff',
    }
}

type MTAButtonProps = {
    label: string;
}  & ButtonProps;

export default function MTAButton({label = '', ...props}) {
    return <Button {...props}>
        { label }
    </Button>
}