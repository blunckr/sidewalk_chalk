import {Socket} from 'phoenix';

export default class {
  constructor(sidewalkId, updateColorAction){
    const socket = new Socket('/socket', {params: {token: window.userToken}});
    socket.connect();

    // Now that you are connected, you can join channels with a topic:
    this.channel = socket.channel(`sidewalks:${sidewalkId}`, {});
    this.channel.join()
      .receive('ok', resp => console.log('Joined successfully', resp))
      .receive('error', resp => console.log('Unable to join', resp));

    this.updateColorAction = updateColorAction;
    this.channel.on('update_color', this.pullColor.bind(this));
  };

  pullColor({position, color}){
    const y = Math.floor(position / 50);
    const x = position % 50;
    this.updateColorAction(y, x, color);
  }

  pushColor(y, x, color, cols){
    const position = (y * cols) + x;
    this.channel.push('update_color', {position, color});
  }
}
