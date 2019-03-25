
import choo from 'nanochoo';
import html from 'nanohtml';

function clockView(state) {
	return html`
		<section>
			<p>Current time is ${state.dateTime}</p>
		</section>
	`;
}

function clockStore(state, emitter) {
	state.dateTime = new Date();
	emitter.on('tick', function() {
		state.dateTime = new Date();
		emitter.emit('render');
	});
}

const app = choo();
app.use(clockStore);
app.view(clockView);
app.mount(document.getElementById('app'));

setInterval(function() {
	app.emitter.emit('tick');
}, 800);