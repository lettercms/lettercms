import Spinner from '@/components/svg/spinner';
import Image from 'next/image';

const Load = () => <div>
	<div id="load-container">
		<img alt="David's Devel Logo" className='image' src={`${process.env.ASSETS_BASE}/assets/lettercms-logo.svg`}/>
		<div className='image-spinner' style={{marginTop: 25}}>
			<Spinner fill='#3c4146' id='spinner'/>
		</div>
	</div>
	<style jsx>{`
		.image {
			margin: 0 auto;
			width: 10rem;
			position: relative;
		}
		.image-spinner {
			width: 75px;
			height: 75px;
			position: relative;
		}
		#load-container {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			left: 0;
			top: 0;
		}
	`}</style>
	<style jsx global>{`
		#load-container #spinner {
			animation: rotation 1s infinite linear;
		}
	`}</style>
</div>;

export default Load;
