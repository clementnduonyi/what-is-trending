"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trends_1 = __importDefault(require("./reddit/trends"));
const storage_1 = __importDefault(require("./data/storage"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const integration_1 = require("./integration");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const url = process.env.TELEX_RETURN_URL;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Endpoint to retrieve telexIntegrationConfig
app.get('/integration', (req, res) => {
    res.json(integration_1.telexIntegrationConfig);
});
function sendTelexResponse(channelId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            event_name: 'Social media Trends',
            message,
            status: 'success',
            username: 'WIT',
        };
        try {
            const telex_webhooks = `${url}/${channelId}`;
            const result = yield (0, node_fetch_1.default)(telex_webhooks, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(response),
            });
            if (!result.ok) {
                throw new Error(`Failed to send response to Telex: ${result.statusText}`);
            }
        }
        catch (error) {
            console.error('Error sending response to Telex:', error);
            throw error;
        }
    });
}
app.get('/trends', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channelId = req.body.channel_id;
    try {
        const trends = yield (0, trends_1.default)();
        // Retrieve stored user preferences
        const storedPreferences = yield storage_1.default.get('preferences');
        const userPreferences = storedPreferences ? JSON.parse(storedPreferences) : [];
        // Filter trends based on user preferences
        const filteredTrends = userPreferences.length
            ? userPreferences.reduce((acc, category) => {
                acc[category] = trends[category] || [];
                return acc;
            }, {})
            : trends; // Return all trends if no preferences are set
        // Convert filtered trends to a message string
        const message = Object.entries(filteredTrends)
            .map(([category, items]) => {
            const itemsList = items.map(item => `- [${item.title}](${item.url})`).join('\n');
            return `**${category.toUpperCase()}**\n${itemsList}`;
        })
            .join('\n\n');
        // Send trends to Telex webhook dynamically
        yield sendTelexResponse(channelId, message);
        res.json({ trends: filteredTrends });
    }
    catch (error) {
        console.error('Error fetching trends:', error);
        res.status(500).json({ error: 'Failed to fetch trends' });
    }
}));
app.post('/preferences', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categories } = req.body;
    if (!Array.isArray(categories)) {
        res.status(400).json({ error: 'Invalid categories format' });
        return;
    }
    yield storage_1.default.put('preferences', JSON.stringify(categories));
    res.json({ message: 'Preferences saved successfully' });
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
