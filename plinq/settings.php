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

/**
 * Plugin administration pages are defined here.
 *
 * @package     assignfeedback_plinq
 * @category    admin
 * @copyright   2022 Sergey Naumov <drmgc@yandex.ru>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedIf
    if ($ADMIN->fulltree) {
        // TODO: Define the plugin settings page - {@link https://docs.moodle.org/dev/Admin_settings}.
        $settings->add(
            new admin_setting_configcheckbox(
                'assignfeedback_plinq/default',
                new lang_string('default', 'assignfeedback_plinq'),
                new lang_string('default_help', 'assignfeedback_plinq'),
                0 // По умолчанию выключен
            )
        );
    }
}
