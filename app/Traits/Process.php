<?php

namespace App\Traits;

use App\Models\UploadModel;
use App\Models\JournalEntry;
use App\Models\PartnerTransaction;

trait Process
{
  use Sys;

  public function newSerial()
  {
    return $this->max('serial') + 1;
  }

  public function transaction()
  {
    return $this->morphOne(PartnerTransaction::class, 'map');
  }

  public function journalEntries()
  {
    return $this->morphMany(JournalEntry::class, 'map')->orderBy('debit', 'DESC');
  }

  public function getJournalDebitAmountAttribute()
  {
    return $this->journalEntries->sum('debit');
  }

  public function getJournalCreditAmountAttribute()
  {
    return $this->journalEntries->sum('credit');
  }

  public function getIsApprovedAttribute()
  {
    return true;
  }

  public function files()
  {
    return $this->morphMany(UploadModel::class, 'map');
  }

  public function getCanUpdateAttribute()
  {
    return true;
  }

  public function getCanDeleteAttribute()
  {
    return $this->canUpdate;
  }
}
