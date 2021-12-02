import React, { useContext } from 'react';
import { ModalContext } from '../Layout/Layout';
import './Modal.css';
import TransactionInput from '../TransactionInput/TransactionInput';
import BetInput from '../BetInput/BetInput';
const Modal = () => {
    const [open, setOpen] = useContext(ModalContext)
    var modal = document.getElementById("myModal");
    const closeModal = (props) => setOpen({display: 'none'});
    window.onclick = function(event) {
      if (event.target === modal) {
        if (open.display === 'block') {
            setOpen({display: 'none'});
        }
      }
    }
    return (
        <div className="container">
            <div id="myModal" style={open} className="modal">
                <div className="modal-content">
                    <span onClick={closeModal} className="close">&times;</span>
                    {open.component === 'TransactionInput' && <TransactionInput transaction ='deposit' />}
                    {open.component === 'bet' && <BetInput/>}
                </div>
            </div>
        </div>
    );
};

export default Modal;