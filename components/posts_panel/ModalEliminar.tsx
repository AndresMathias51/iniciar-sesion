// ModalEliminar.tsx

import styles from "./ModalEliminar.module.css"

type Props = {
    visible: boolean,
    onClose: () => void,
    onConfirmar: () => void
}

export default function ModalEliminar({
    visible,
    onClose,
    onConfirmar
}: Props) {
    if(!visible) return null;
    return (
        <div className={styles.overlay_modal}>
            <div className={styles.modal_eliminar}>
                <h3>Eliminar publicación</h3>
                <p>
                    ¿Está seguro de eliminar este post?
                </p>
                <div className={styles.botones_modal}>
                    <button
                        className={styles.btn_cancelar}
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.btn_confirmar}
                        onClick={onConfirmar}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}