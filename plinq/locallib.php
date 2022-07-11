<?php
// This file is part of Plagiarism Inquisitor -
// https://github.com/drmgc/plagiarism-inquisitor
//
// Plagiarism Inquisitor is free software: you can redistribute it
// and/or modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.
//
// Plagiarism Inquisitor is distributed in the hope that it will be
// useful, but WITHOUT ANY WARRANTY; without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

defined('MOODLE_INTERNAL') || die();


/**
 * Library class for the Plagiarism Inquisitor feedback plugin extending
 * feedback plugin base class.
 *
 * @package   assignfeedback_plinq
 * @copyright 2022 Sergey Naumov <drmgc@yandex.ru>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class assign_feedback_plinq extends assign_feedback_plugin {
    /**
     * Get the name of the Plagiarism Inquisitor feedback plugin.
     * @return string
     */
    public function get_name() {
        return get_string('pluginname', 'assignfeedback_plinq');
    }


    /**
     * Save the settings for the Plagiarism Inquisitor feedback plugin
     *
     * @param stdClass $data
     * @return bool
     */
    public function save_settings(stdClass $data) {
        $this->set_config('docheck', !empty($data->assignfeedback_plinq_docheck));
        return true;
    }

    /**
     * Get the default setting for the Plagiarism Inquisitor feedback plugin
     *
     * @param MoodleQuickForm $mform The form to add elements to
     * @return void
     */
    public function get_settings(MoodleQuickForm $mform) {
        $default = $this->get_config('docheck');
        if ($default === false) {
            // Apply the admin default if we don't have a value yet.
            $default = get_config('assignfeedback_plinq', 'default');
        }
        $mform->addElement(
            'selectyesno',
            'assignfeedback_plinq_docheck',
            get_string('docheck', 'assignfeedback_plinq'));
        $mform->addHelpButton(
            'assignfeedback_plinq_docheck',
            'docheck',
            'assignfeedback_plinq');
        $mform->setDefault('assignfeedback_plinq_docheck', $default);
        $mform->hideIf('assignfeedback_plinq_docheck',
                       'assignfeedback_plinq_enabled',
                       'notchecked');
    }
}
