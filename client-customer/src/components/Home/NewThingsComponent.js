import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import classNames from "classnames/bind";
import styles from './scss/Newthing.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function NewThings() {
    const cx = classNames.bind(styles)

    return (
        <div className={cx('Newthing')}>
            <div className='container'>
                <div className={cx('Center')}>
                    <div className={cx('test')}>
                        <div className={cx('Left')}>
                            <NotificationsActiveIcon />
                            <span>Có gì mới</span>
                        </div>
                        <div className={cx('Middle')}> 
                            <span>Khao ưu đãi cực đỉnh trong tháng 7, PHÍ DỊCH VỤ NAY CHỈ CÒN 3% (áp dụng mọi đơn hàng không giới hạn giá trị)</span>
                        </div>
                    </div>
                    <div className={cx('Right')}> 
                        <p>Xem thêm <ArrowForwardIosIcon className="icon"/> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewThings;