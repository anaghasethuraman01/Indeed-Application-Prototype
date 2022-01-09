import { Modal } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {userActionCreator} from '../../reduxutils/actions.js';
import {bindActionCreators} from 'redux';

function SuccessMsg(props) {
    const dispatch = useDispatch();
    const successModal = useSelector((state)=>state.userInfo.successModal);
    const showSuccessModal = bindActionCreators(userActionCreator.showSuccessModal,dispatch);
    return (
        <Modal show={successModal} onHide={()=> showSuccessModal(false)}>
            <Modal.Header>
                <Modal.Title><b style={{color:'green'}}>Success</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>{props.msg}</b>
            </Modal.Body>
        </Modal>
    )
}
export default SuccessMsg;