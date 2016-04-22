import {Socket} from 'phoenix';

export default class {
  constructor (sidewalkId, updateColorAction){
    const socket = new Socket('/socket', {params: {token: window.userToken}});
    socket.connect();

    // Now that you are connected, you can join channels with a topic:
    this.channel = socket.channel(`sidewalks:${sidewalkId}`, {});
    this.channel.join()
      .receive('ok', resp => console.log('Joined successfully', resp))
      .receive('error', resp => console.log('Unable to join', resp));

    this.channel.on('update_color', data => {
      const {position, color} = data;
      updateColorAction(position, position, color);
    });
  };

  updateColor (y, x, color){
    this.channel.push('update_color', {position: y, color});
  }
}
