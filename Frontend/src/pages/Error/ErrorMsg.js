import { Modal } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {userActionCreator} from '../../reduxutils/actions.js';
import {bindActionCreators} from 'redux';

function ErrorMsg(props) {
    const dispatch = useDispatch();
    const errorModal = useSelector((state)=>state.userInfo.errorModal);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    return (
        <Modal show={errorModal} onHide={()=> showErrorModal(false)}>
            <Modal.Header>
                <Modal.Title><b style={{color:'red'}}>Error</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>{props.err}</b>
            </Modal.Body>
        </Modal>
    )
}
export default ErrorMsg;