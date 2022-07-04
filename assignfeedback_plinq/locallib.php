<?php

class assign_feedback_plinq extends assign_feedback_plugin {
    public function get_name() {
        return get_string('plinq', 'assignfeedback_plinq');
    }

    public function get_settings(MoodleQuickForm $mform) {
        $mform->addElement('assignfeedback_plinq_plinqextensions', get_string('allowedfileextensions', 'assignfeedback_plinq'));
        $mform->setType('assignfeedback_plinq_fileextensions', PARAM_FILE);
    }

    public function save_settings(stdClass $data) {
        $this->set_config('allowedfileextensions', $data->allowedfileextensions);
        return true;
    }
}
