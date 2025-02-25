"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telexIntegrationConfig = void 0;
exports.telexIntegrationConfig = {
    "data": {
        "date": {
            "created_at": "2025-02-22",
            "updated_at": "2025-02-22"
        },
        "descriptions": {
            "app_description": "This application pulls trending topics at intervals and send the with links to assigned Telex channel. It has the functinality for users to select their prefered Trends",
            "app_logo": "https://res.cloudinary.com/ccapp/image/upload/v1740234932/sparkling-cosmic-system-png-5690533_gafzof.svg",
            "app_name": "WIT-what is tending?.",
            "app_url": "https://what-is-trending.onrender.com/",
            "background_color": "#HEXCODE"
        },
        "integration_category": "Monitoring & Logging",
        "integration_type": "interval",
        "is_active": false,
        "key_features": [
            "Trends preference",
            "Links to trending topics",
            "Categorizes trending topics around SM"
        ],
        "permissions": {
            "monitoring_user": {
                "always_online": true,
                "display_name": "Performance Monitor"
            }
        },
        "author": "Clement Nduonyi",
        "settings": [
            {
                "label": "interval",
                "type": "text",
                "required": true,
                "default": "* * * * *"
            },
            {
                "label": "Trends Preference",
                "type": "dropdown",
                "required": true,
                "default": "All",
                "options": ["politics", "crypto", "tech", "gossip", "business", "sports", "education", "football", "nigeria-politics", "nigeria-news"]
            }
        ],
        "tick_url": "https://what-is-trending.onrender.com/trends",
        "target_url": ""
    }
};
