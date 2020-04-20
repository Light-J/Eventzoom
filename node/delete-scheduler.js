const aws = require('aws-sdk');
const rulename = process.argv[2];
console.log("Deleting AWS event: " + rulename);
const instance = new aws.CloudWatchEvents({ region: 'eu-west-3' });
instance.listRules((err, data) => {
	console.log(err);
	const a = data.Rules.find((rule) => rule.Name === rulename);
	if (!a) {
		console.log('rule does not exist');
		return;
	}
	instance.listTargetsByRule({ Rule: rulename }, (err, data) => {
		console.log(err);
		const ids = data.Targets.map((target) => target.Id);
		if (ids.length > 0) {
			instance.removeTargets({ Ids: ids, Rule: rulename }, (err, data) => {
				console.log(err);
				if (!err) {
					instance.deleteRule({ Name: rulename }, (err, data) => {
						console.log(err);
						if (!err) {
							console.log('success');
						}
					});
				}
			});
			return;
		}
		instance.deleteRule({ Name: rulename }, (err, data) => {
			console.log(err);
			if (!err) {
				console.log('success');
			}
		});
	});
});
