
import choo from 'nanochoo';
import html from 'nanohtml';

function helloView(state, emit) {
	function onclick() {
		emit('inc', 1);
	}


	return html`
		<section>
			<p>Current count is ${state.count}</p>
			<div><button onclick=${onclick}>Inc</button></div>
		</section>
	`;
}

function countStore(state, emitter) {
	state.count = 0;
	emitter.on('inc', function(count) {
		state.count += count;
		emitter.emit('render');
	});
}

const app = choo();
app.use(countStore);
app.view(helloView);
app.mount(document.getElementById('app'));