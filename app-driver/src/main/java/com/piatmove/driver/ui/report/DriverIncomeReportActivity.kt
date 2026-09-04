package com.piatmove.driver.ui.report

import android.app.DatePickerDialog
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.data.models.DriverDailyReport
import com.piatmove.core.utils.Resource
import com.piatmove.driver.databinding.ActivityDriverIncomeReportBinding
import com.piatmove.driver.ui.history.DriverTripsAdapter
import com.piatmove.driver.ui.home.DriverViewModel
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class DriverIncomeReportActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDriverIncomeReportBinding
    private lateinit var viewModel: DriverViewModel
    private val adapter = DriverTripsAdapter()

    private val calendar = Calendar.getInstance()
    private val apiDateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.US)
    private val displayDateFormat = SimpleDateFormat("EEE, MMM dd, yyyy", Locale.US)

    private var currentReport: DriverDailyReport? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDriverIncomeReportBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        viewModel = ViewModelProvider(this)[DriverViewModel::class.java]

        binding.rvDailyTransactions.layoutManager = LinearLayoutManager(this)
        binding.rvDailyTransactions.adapter       = adapter

        setupDateControls()
        setupShareReport()
        observeViewModel()

        loadDailyReport()
    }

    private fun setupDateControls() {
        updateDateDisplay()

        binding.btnPrevDay.setOnClickListener {
            calendar.add(Calendar.DAY_OF_YEAR, -1)
            updateDateDisplay()
            loadDailyReport()
        }

        binding.btnNextDay.setOnClickListener {
            val today = Calendar.getInstance()
            if (calendar.before(today)) {
                calendar.add(Calendar.DAY_OF_YEAR, 1)
                updateDateDisplay()
                loadDailyReport()
            } else {
                Toast.makeText(this, "Cannot view future dates", Toast.LENGTH_SHORT).show()
            }
        }

        binding.btnSelectDate.setOnClickListener {
            showDatePicker()
        }
    }

    private fun showDatePicker() {
        val year  = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day   = calendar.get(Calendar.DAY_OF_MONTH)

        val picker = DatePickerDialog(this, { _, y, m, d ->
            calendar.set(Calendar.YEAR, y)
            calendar.set(Calendar.MONTH, m)
            calendar.set(Calendar.DAY_OF_MONTH, d)
            updateDateDisplay()
            loadDailyReport()
        }, year, month, day)

        // Restrict to max today
        picker.datePicker.maxDate = System.currentTimeMillis()
        picker.show()
    }

    private fun updateDateDisplay() {
        val todayStr = apiDateFormat.format(Calendar.getInstance().time)
        val selectedStr = apiDateFormat.format(calendar.time)

        if (selectedStr == todayStr) {
            binding.tvSelectedDate.text = "Today, " + displayDateFormat.format(calendar.time)
        } else {
            binding.tvSelectedDate.text = displayDateFormat.format(calendar.time)
        }

        val today = Calendar.getInstance()
        val isToday = (calendar.get(Calendar.YEAR) == today.get(Calendar.YEAR) &&
                calendar.get(Calendar.DAY_OF_YEAR) == today.get(Calendar.DAY_OF_YEAR))
        binding.btnNextDay.isEnabled = !isToday
        binding.btnNextDay.alpha = if (isToday) 0.3f else 1.0f
    }

    private fun loadDailyReport() {
        val dateStr = apiDateFormat.format(calendar.time)
        viewModel.fetchDailyReport(dateStr)
    }

    private fun observeViewModel() {
        viewModel.dailyReport.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility       = View.VISIBLE
                    binding.scrollViewContent.visibility = View.GONE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility       = View.GONE
                    binding.scrollViewContent.visibility = View.VISIBLE
                    state.data?.let { renderReport(it) }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility       = View.GONE
                    binding.scrollViewContent.visibility = View.VISIBLE
                    val dateStr = apiDateFormat.format(calendar.time)
                    renderReport(DriverDailyReport(date = dateStr))
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun renderReport(report: DriverDailyReport) {
        currentReport = report

        // Income summary
        binding.tvTotalIncome.text = "₱%.2f".format(report.total_income)
        binding.tvTripCount.text   = "${report.total_trips} trips"

        val avgFare = if (report.total_trips > 0) report.total_income / report.total_trips else 0.0
        binding.tvAverageFare.text = "₱%.2f".format(avgFare)

        // Breakdown
        binding.tvRegularTrips.text    = "${report.regular_trips} trips"
        binding.tvDiscountedTrips.text = "${report.discounted_trips} trips"

        binding.chipStudent.text  = "🎓 ${report.student_trips} Student"
        binding.chipSenior.text   = "👴 ${report.senior_trips} Senior"
        binding.chipPwd.text      = "♿ ${report.pwd_trips} PWD"
        binding.chipPregnant.text = "🤰 ${report.pregnant_trips} Pregnant"

        // Transactions list
        val trips = report.trips
        if (trips.isEmpty()) {
            binding.layoutEmptyReport.visibility    = View.VISIBLE
            binding.rvDailyTransactions.visibility  = View.GONE
        } else {
            binding.layoutEmptyReport.visibility    = View.GONE
            binding.rvDailyTransactions.visibility  = View.VISIBLE
            adapter.submitList(trips)
        }
    }

    private fun setupShareReport() {
        binding.btnShareReport.setOnClickListener {
            val report = currentReport ?: return@setOnClickListener
            val driverName = PrefsManager.getUserName(this) ?: "Driver Partner"
            val dateLabel = displayDateFormat.format(calendar.time)

            val summaryText = """
                📊 PiatMove Driver Daily Income Report
                ━━━━━━━━━━━━━━━━━━━━━
                📅 Date: $dateLabel
                👤 Driver: $driverName
                💰 Gross Income: ₱%.2f
                🚗 Completed Trips: ${report.total_trips}
                ⚡ Average / Trip: ₱%.2f
                
                🏷️ Breakdown:
                • Regular Fares: ${report.regular_trips} trips
                • Discounted Fares: ${report.discounted_trips} trips
                  (🎓 Student: ${report.student_trips}, 👴 Senior: ${report.senior_trips}, ♿ PWD: ${report.pwd_trips}, 🤰 Pregnant: ${report.pregnant_trips})
                ━━━━━━━━━━━━━━━━━━━━━
                ✨ Verified via PiatMove LGU Transport
            """.trimIndent().format(
                report.total_income,
                if (report.total_trips > 0) report.total_income / report.total_trips else 0.0
            )

            val sendIntent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, summaryText)
                type = "text/plain"
            }
            startActivity(Intent.createChooser(sendIntent, "Share Income Report"))
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }
}
