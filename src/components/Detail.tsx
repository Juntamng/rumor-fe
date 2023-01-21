import React from 'react';
import Modal from './UI/Modal';
import style from './Detail.module.css';

import { useSearchContext } from "../components/contexts/SearchProvider"

const Detail: React.FC = () => {
  const { selectedItem, closeDetail } = useSearchContext()
  return (
    <Modal onClose={closeDetail}>
          <img className={style.image} alt={selectedItem?.description || ""} src={selectedItem?.regularImgUrl} />
          <div className={style.footer}>
            <button onClick={closeDetail}>
              Close
            </button>
          </div>
    </Modal>
  );
};

export default Detail;
