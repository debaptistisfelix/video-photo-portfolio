import toast, { Toaster } from 'react-hot-toast';

const notify = (text, status) => toast(<>{text}</>, {
    style:{
        backgroundColor: status === "success" ? "white" : "red",
        color: status === "success" ? "gray" : "white",
    }
   });

export default notify;