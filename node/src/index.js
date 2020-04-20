import root from './root';
import serverConfig from '../config/server';

root.server.listen(serverConfig.port);
export default root;
