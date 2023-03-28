const Load = () => <div>
	<div id="load-container">
		<img id='logo' src="/images/davidsdevel-rombo.png"/>
		<img id='spinner' src='/assets/spinner-black.svg'/>
	</div>
	<style jsx>{`
		#load-container {
			position: sticky;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			left: 0;
			top: 0;
		}
		#load-container img#logo {
			width: 150px;
		}
	`}</style>
	<style jsx global>{`
		#load-container img#spinner {
			animation: rotation 1s infinite linear;
			width: 75px;
			margin-top: 25px;
		}
	`}</style>
</div>;

export default Load;
