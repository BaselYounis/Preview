import type { CSSProperties } from "@mui/material";
import { type FunctionComponent } from "react";
interface ProviderFormProps {
    className?: string;
    style?:CSSProperties;
    ref?: React.Ref<HTMLDivElement>;
}
 
const ProviderForm: FunctionComponent<ProviderFormProps> = ({style,...props}) => {
    const baseStyle:CSSProperties = {
        
        ...style
    }
    return ( <div ref={props.ref} className={` ${props.className}`} style={baseStyle}>Provider Form</div> );
}
 
export default ProviderForm;