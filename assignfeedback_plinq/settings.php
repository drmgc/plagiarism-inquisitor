<?php

$settings->add(
    new admin_setting_configcheckbox(
        'assignfeedback_plinq/default',
        new lang_string('default', 'assignfeedback_plinq'),
        new lang_string('default_help', 'assignfeedback_plinq'),
        0
    )
);
