package com.piatmove.driver.ui.dashboard

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.driver.R
import com.piatmove.driver.databinding.FragmentDriverDashboardBinding
import com.piatmove.driver.ui.home.DriverViewModel

class DriverDashboardFragment : Fragment() {

    private var _binding: FragmentDriverDashboardBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: DriverViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentDriverDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[DriverViewModel::class.java]

        val name = PrefsManager.getUserName(requireContext()) ?: "Driver"
        binding.tvGreeting.text = "Hello, $name!"

        viewModel.checkDriverStatus()

        binding.switchOnline.setOnClickListener {
            val isApproved = viewModel.approvalStatus.value == "approved"
            if (!isApproved) {
                binding.switchOnline.isChecked = false
                Toast.makeText(requireContext(), "Your account is pending admin approval. You cannot go online yet.", Toast.LENGTH_LONG).show()
            } else {
                viewModel.toggleOnline(binding.switchOnline.isChecked)
            }
        }

        viewModel.approvalStatus.observe(viewLifecycleOwner) { status ->
            if (status == "approved") {
                binding.cardPendingApproval.visibility = View.GONE
                binding.tvApprovalStatus.text = "✓ Account Approved"
                binding.tvApprovalStatus.setTextColor(requireContext().getColor(R.color.colorHeroSubtitle))
                binding.switchOnline.isEnabled = true
            } else {
                binding.cardPendingApproval.visibility = View.VISIBLE
                binding.tvApprovalStatus.text = "⏳ Pending Admin Approval"
                binding.tvApprovalStatus.setTextColor(Color.parseColor("#FDE68A"))
                binding.switchOnline.isEnabled = false
                binding.switchOnline.isChecked = false
            }
        }

        viewModel.isOnline.observe(viewLifecycleOwner) { online ->
            binding.switchOnline.isChecked = online
            if (online) {
                binding.tvOnlineStatus.text  = getString(R.string.status_online)
                binding.tvOnlineSubtitle.text = getString(R.string.status_online_sub)
                binding.tvOnlineStatus.setTextColor(requireContext().getColor(R.color.statusCompleted))
            } else {
                binding.tvOnlineStatus.text  = getString(R.string.status_offline)
                binding.tvOnlineSubtitle.text = getString(R.string.status_offline_sub)
                binding.tvOnlineStatus.setTextColor(requireContext().getColor(R.color.black))
            }
        }

        viewModel.statusError.observe(viewLifecycleOwner) { error ->
            error?.let {
                Toast.makeText(requireContext(), it, Toast.LENGTH_LONG).show()
                viewModel.statusError.value = null
            }
        }
    }

    override fun onResume() {
        super.onResume()
        viewModel.checkDriverStatus()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
