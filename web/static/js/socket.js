import {Socket} from 'phoenix';

export default (sidewalkId, imageActions)=>{
  const socket = new Socket('/socket', {params: {token: window.userToken}});
  socket.connect();

  // Now that you are connected, you can join channels with a topic:
  const channel = socket.channel(`sidewalks:${sidewalkId}`, {});
  channel.join()
    .receive('ok', resp => console.log('Joined successfully', resp))
    .receive('error', resp => console.log('Unable to join', resp));

  // channel.
};
