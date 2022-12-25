import React from "react";
import { CloseIcon } from "../icons";
import "./style.css"

export default function Modal({ show, onClose, children, title }) {
	if (!show) return null;  // show özelliği, modalın gösterilip gösterilmeyeceğini belirleyen bir boolean değeridir. show false ise, modal bileşeni null döndürecektir ve böylece sayfadan gizlenmiş olacaktır.

	return (
		<div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							{title}
						</h5>
						<CloseIcon onClick={onClose}/>  {/* CloseIcon bileşeninden içe aktarılan bir kapatma simgesine de sahiptir. Kapatma simgesine tıklandığında, modalı kapatmak için onClose işlevini çağırır. */}
					</div>
					<div className="modal-body">{children}</div>
				</div>
			</div>
		</div>
	);
}
