import * as socials from '@lettercms/models/socials';
import getEntry from './generateEntryChannel';

export default async function Session() {
  const {req, res} = this;

  const {
    routes,
    action,
    sessionTime,
    referrer
  } = req.body;

  const {subdomain} = req;

  const ua = req.headers['user-agent'];

  //const {os} = parser(ua);
  const device = /Android|iPhone|iPad/.test(ua) ? 'mobile' : 'desktop';

  if (action === 'start') {
    /*
    const statsData = await subdomainRef.get();

    const statsOs = statsData[os.name];

    const newStats = {
      activeUsers: statsData.activeUsers + 1,
      [os.name]: (statsOs || 0) + 1
    };

    await subdomainRef.set(newStats);
    */

    return res.json({
      status: 'OK'
    });
  }

  if (action === 'end') {
    if (routes.length === 1) {
      //Update Bounce Rate
      const {bounces} = await stats.Stats.findOne({subdomain});
      
      await stats.Stats.updateOne({subdomain}, {
        bounces: bounces + 1
      });
    }

    await stats.Sessions.create({
      sessionTime,
      routes,
      subdomain,
      device,
      entryChannel: getEntry(referrer)
    });

    //const statsData = await subdomainRef.get();

    //const statsOs = statsData[os.name];

    /*const newStats = {
      activeUsers: statsData.activeUsers - 1,
      [os.name]: statsOs - 1
    };*/

    //await subdomainRef.set(newStats);

    res.json({
      status: 'OK'
    });
  }
};
