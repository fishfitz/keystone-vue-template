const keystone = require('keystone');
const Config = new keystone.List('Config');

Config.add({
    name: { type: String, required: true, initial: true },
    isActive: { type: Boolean, default: false }
});

Config.schema.pre('save', async function(next) {
    if (this.isActive) {
        const lastActiveConfig = await keystone.config(true);
        if (lastActiveConfig && !lastActiveConfig.equals(this)) {
            lastActiveConfig.isActive = false;
            await lastActiveConfig.save();
        }
    }
    next();
});

Config.defaultColumns = 'name, isActive';

Config.register();
